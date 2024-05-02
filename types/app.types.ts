export interface User {
    expiresAt: string | number;
    id: string;
    firstName: string;
    lastName: string;
    // TODO: Remove branchTag once we're off v3
    branchTag: string;
    preferredBranch: string;
    branch: string;
    eid: string;
    phone?: string;
    mobile?: string;
    permitSms: boolean;
    name: string;
    email: string;
    token: string;
    group: string;
    products: Products;
    permissions: Permissions;
    forcePasswordChange: boolean;
    canvassDivision: string;
    atHomeshow: boolean;
    homeshowId: string | null;
    timezone: string;
    callCenter: boolean;
}

interface Products {
    [key: string]: string;
}

interface Permissions {
    [key: string]: { [key: string]: boolean };
}
