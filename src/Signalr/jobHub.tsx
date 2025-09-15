import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/jobHub")
    .withAutomaticReconnect() // tự động reconnect khi mất kết nối
    .build();

export default connection;
