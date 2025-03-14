import { EventType, UserAgentType } from "./enums";

export const eventToNameMap: { [K in EventType]: string } = {
    [EventType.GET_SECRETS]: "List secrets",
    [EventType.GET_SECRET]: "Read secret",
    [EventType.CREATE_SECRET]: "Create secret",
    [EventType.UPDATE_SECRET]: "Update secret",
    [EventType.DELETE_SECRET]: "Delete secret",
    [EventType.GET_WORKSPACE_KEY]: "Read project key",
    [EventType.AUTHORIZE_INTEGRATION]: "Authorize integration",
    [EventType.UNAUTHORIZE_INTEGRATION]: "Unauthorize integration",
    [EventType.CREATE_INTEGRATION]: "Create integration",
    [EventType.DELETE_INTEGRATION]: "Delete integration",
    [EventType.ADD_TRUSTED_IP]: "Add trusted IP",
    [EventType.UPDATE_TRUSTED_IP]: "Update trusted IP",
    [EventType.DELETE_TRUSTED_IP]: "Delete trusted IP",
    [EventType.CREATE_SERVICE_TOKEN]: "Create service token",
    [EventType.DELETE_SERVICE_TOKEN]: "Delete service token",
    [EventType.CREATE_ENVIRONMENT]: "Create environment",
    [EventType.UPDATE_ENVIRONMENT]: "Update environment",
    [EventType.DELETE_ENVIRONMENT]: "Delete environment",
    [EventType.ADD_WORKSPACE_MEMBER]: "Add member",
    [EventType.REMOVE_WORKSPACE_MEMBER]: "Remove member",
    [EventType.CREATE_FOLDER]: "Create folder",
    [EventType.UPDATE_FOLDER]: "Update folder",
    [EventType.DELETE_FOLDER]: "Delete folder",
    [EventType.CREATE_WEBHOOK]: "Create webhook",
    [EventType.UPDATE_WEBHOOK_STATUS]: "Update webhook status",
    [EventType.DELETE_WEBHOOK]: "Delete webhook",
    [EventType.GET_SECRET_IMPORTS]: "List secret imports",
    [EventType.CREATE_SECRET_IMPORT]: "Create secret import",
    [EventType.UPDATE_SECRET_IMPORT]: "Update secret import",
    [EventType.DELETE_SECRET_IMPORT]: "Delete secret import",
    
};

export const userAgentTTypeoNameMap: { [K in UserAgentType]: string } = {
    [UserAgentType.WEB]: "Web",
    [UserAgentType.CLI]: "CLI",
    [UserAgentType.K8_OPERATOR]: "K8s operator",
    [UserAgentType.OTHER]: "Other",
};