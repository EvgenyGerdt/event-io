import type { SocketConnection } from "@/types/Connection";

export default class Connection {
    private id: string;
    private userId: string;

    constructor(data: SocketConnection) {
        this.id = data.id;
        this.userId = data.userId;
    }
}
