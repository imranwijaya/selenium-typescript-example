import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { faker, fakerID_ID } from "@faker-js/faker";
import dayjs from "dayjs";
import { query } from "@config/db";

interface Customer {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
}
interface CustomerRecord extends Customer, RowDataPacket {}
type CreateCustomerData = Omit<Customer, "id">;

async function findById(id: number): Promise<CustomerRecord> {
  const [rows] = await query<CustomerRecord[]>(
    "SELECT * FROM t_customer WHERE id = ? LIMIT 1",
    [id],
  );

  return rows[0];
}

async function findByEmails(emails: string[]): Promise<CustomerRecord[]> {
  const [rows] = await query<CustomerRecord[]>(
    "SELECT id FROM t_customer WHERE email = ?",
    [emails],
  );

  return rows;
}

async function create(data: CreateCustomerData) {
  const [result] = await query<ResultSetHeader>(
    "INSERT INTO t_customer SET ?",
    [data],
  );

  return result;
}

function generateFakeData() {
  const firstName = fakerID_ID.person.firstName();
  const lastName = fakerID_ID.person.lastName();

  const customer: CreateCustomerData = {
    name: `${firstName} ${lastName}`,
    email: fakerID_ID.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number({ style: "mobile" }),
    address: fakerID_ID.location.streetAddress({ useFullAddress: true }),
    created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    created_by: 1,
    updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    updated_by: 1,
  };

  return customer;
}

async function removeByEmail(email: string) {
  const [result] = await query<ResultSetHeader>(
    "DELETE FROM t_customer WHERE email = ?",
    [email],
  );

  return result;
}

export default {
  findById,
  findByEmails,
  create,
  generateFakeData,
  removeByEmail,
};
