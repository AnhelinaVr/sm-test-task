import { HTTP_CODES } from "@/constants";

export const checkResponses = (...responses: Response[]) => {
  for (const response of responses) {
    if (!response.ok) {
      return { statusCode: response.status };
    }
  }
  return { statusCode: HTTP_CODES.OK };
};
