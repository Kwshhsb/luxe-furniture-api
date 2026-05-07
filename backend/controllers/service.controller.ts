import db from "../config/db";

export const getAllServices = (req: any, res: any) => {
  const services = db.prepare("SELECT * FROM services").all();
  res.json(services);
};
