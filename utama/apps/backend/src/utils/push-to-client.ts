import { logger } from "@/logger";
import { StudentSchema } from "@/types/student-type";
import axios from "axios";
import "dotenv/config";

const { CLIENT1_URL, CLIENT2_URL } = process.env;

type EventType = "CREATE" | "UPDATE" | "DELETE";
export const pushToClient = async (event: EventType, data: StudentSchema) => {
  const payload = { event, data, timestamp: new Date().toISOString() };

  const clients = [
    { name: "Client 1 (Laki - laki): ", url: CLIENT1_URL },
    { name: "Client 2 (Perempuan): ", url: CLIENT2_URL },
  ];
  for (const client of clients) {
    try {
      await axios.post(client.url!, payload);
      logger.info(
        `${client.name} Data pushed successfully: ${JSON.stringify(payload)}`,
      );
    } catch (error) {
      logger.error(`${client.name} Error pushing data: ${error}`);
    }
  }
};
