import { inject } from "vue";

import type { Socket } from "socket.io-client";

export default function useSocket() {
    return inject("socket") as Socket;
}
