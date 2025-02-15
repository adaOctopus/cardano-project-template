export const truncate = (addr: any) => {
    if (!addr) {
        return "";
    }
    const l = addr.length;
    const pre = addr.substring(0, 6);
    const end = addr.substring(l - 6, l);
    return `${pre}...${end}`;
};

