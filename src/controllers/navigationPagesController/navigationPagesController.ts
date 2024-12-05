import { db } from "../../database/db";
import type { TSERVICE } from "../../types";
import { asyncHandler } from "../../utils/asyncHandlerUtils";
import { httpResponse } from "../../utils/apiResponseUtils";
import { BADREQUESTCODE, BADREQUESTMSG, SUCCESSCODE, SUCCESSMSG } from "../../constants";
import type { _Request } from "../../middlewares/authMiddleware";

export default {
  // ** Create navigation page controller
  createService: asyncHandler(async (req: _Request, res) => {
    const { name, subServiceTitle, subServiceDescription, serviceDetail } = req.body as TSERVICE;
    const alreadyExistingService = await db.service.findUnique({ where: { name: name } });
    if (alreadyExistingService) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    await db.service.create({
      data: { name, subServiceTitle, subServiceDescription, serviceDetail }
    });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { message: `services created successfully!` });
  })
};
