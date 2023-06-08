import user from "/repositories/Portal/user/user"
import portalProject from "/repositories/Portal/portalProject/portalProject";
import portalProjectType from "/repositories/Portal/portalProjectType/portalProjectType";
import portalTicket from "./Portal/portalTicket/portalTicket";
import portalJitReport from "./Portal/portalJitReport/portalJitReport";
import portalProp from "~/repositories/Portal/portalProp/portalProp";

import rawbase from "./Master/rawbase/rawbase";
import scanNeuronJob from "./Master/scanNeuronJob/scanNeuronJob";
import scanReportRawMaster from "./Master/scanReportRawMaster/scanReportRawMaster";
import projsoft from "./Master/projsoft/projsoft";
import auditorTask from "./Master/auditorTask/auditorTask";
import auditor from "@/repositories/Master/auditor/auditor";
import scanJob from "./Master/scanJob/scanJob";
import serverTesterLog from "~/repositories/Master/serverTesterLog/serverTesterLog";
import scanStat from "@/repositories/Master/scanStat/scanStat";
import evenalerterEvent from "@/repositories/Master/evenalerterEvent/evenalerterEvent";
import vpn from "@/repositories/Master/vpn/vpn"

export const repository = ($axios) => ({
    user: user($axios),
    portalProject: portalProject($axios),
    portalProjectType: portalProjectType($axios),
    portalTicket: portalTicket($axios),
    portalJitReport: portalJitReport($axios),
    portalProp: portalProp($axios),

    rawbase: rawbase($axios),
    scanNeuronJob: scanNeuronJob($axios),
    scanReportRawMaster: scanReportRawMaster($axios),
    projsoft: projsoft($axios),
    auditorTask: auditorTask($axios),
    auditor: auditor($axios),
    scanJob: scanJob($axios),
    serverTesterLog: serverTesterLog($axios),
    scanStat: scanStat($axios),
    evenalerterEvent: evenalerterEvent($axios),
    vpn: vpn($axios),
});