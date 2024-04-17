import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { FIRST_PAGE, HTTP_CODES, PAGE_LIMIT, USERS_URL } from "@/constants";
import { fetchUsers, fetchUsersCount } from "@/api/users";
import { checkResponses } from "@/services/checkResponses";
import { getUsers } from "@/services/users/getUsers";
import { TUserItem } from "@/types/users";

const inter = Inter({ subsets: ["latin"] });

type TGetServerSideProps = {
  statusCode: number;
  users: TUserItem[];
  total: number;
};

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const [usersResponse, countResponse] = await Promise.all([
      fetchUsers({ page: FIRST_PAGE, limit: PAGE_LIMIT }),
      fetchUsersCount({}),
    ]);

    const { statusCode } = checkResponses(usersResponse, countResponse);
    if (statusCode !== HTTP_CODES.OK) {
      return { props: { statusCode, users: [], total: 0 } };
    }

    return {
      props: { statusCode: HTTP_CODES.OK, users: await usersResponse.json(), total: await countResponse.json() },
    };
  } catch (e) {
    return { props: { statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR, users: [], total: 0 } };
  }
}) satisfies GetServerSideProps<TGetServerSideProps>;

export default function Home({ statusCode, users: defaultUsers, total }: TGetServerSideProps) {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [users, setUsers] = useState(defaultUsers);

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    const newUsers = await getUsers({ page });
    setUsers(newUsers);
  };

  if (statusCode !== HTTP_CODES.OK) {
    return <Alert variant={"danger"}>Ошибка {statusCode} при загрузке данных</Alert>;
  }

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={"mb-5"}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.floor(total / PAGE_LIMIT)}
            onPageChange={onPageChange}
          />
        </Container>
      </main>
    </>
  );
}
