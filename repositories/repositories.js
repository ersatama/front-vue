import user from "/repositories/Portal/user/user"
import portalProject from "/repositories/Portal/portalProject/portalProject";
import portalProjectType from "/repositories/Portal/portalProjectType/portalProjectType";
import portalTicket from "./Portal/portalTicket/portalTicket";

import rawbase from "./Master/rawbase/rawbase";
import scanNeuronJob from "./Master/scanNeuronJob/scanNeuronJob";
import scanReportRawMaster from "./Master/scanReportRawMaster/scanReportRawMaster";

export const repository = ($axios) => ({
    user: user($axios),
    portalProject: portalProject($axios),
    portalProjectType: portalProjectType($axios),
    portalTicket: portalTicket($axios),

    scanNeuronJob: scanNeuronJob($axios),
    scanReportRawMaster: scanReportRawMaster($axios),
    rawbase: rawbase($axios)
});