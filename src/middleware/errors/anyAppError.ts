import { ServerError } from "../../utils/errors/server/500Error";
import { BadRequestError } from "../../utils/errors/server/400Error";
import { EntityAlreadyExistsRequestError } from "../../utils/errors/server/409Error";

export type AnyAppError =
  | ServerError
  | BadRequestError
  | EntityAlreadyExistsRequestError;
