import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import {
  RequestCertificates,
  GetAllCertificates,
  ApproveRejectRequest,
} from "./certificate.controller";
import commonMiddleware from "../common/common.middleware";

const CertificateRouter = Router();

CertificateRouter.post(
  "/request",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  RequestCertificates
);

CertificateRouter.get(
  "/getAll",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetAllCertificates
);

CertificateRouter.put(
  "/approveReject/:certificateId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  ApproveRejectRequest
);

export default CertificateRouter;
