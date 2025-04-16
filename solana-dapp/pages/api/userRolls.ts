import type { NextApiRequest, NextApiResponse } from "next";

import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from '../../components/firebase';
import moment from 'moment'

type Data = {
  tickets: number;
};

const preflightCommitment = "processed";
const commitment = "processed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { wallet } = JSON.parse(req.body);

  const m1 = moment('2022-12-01', 'YYYY-MM-DD')
  const m2 = moment('2022-12-30', 'YYYY-MM-DD')

  var utcMoment = moment.utc();
  const date = new Date(utcMoment.format('YYYY-MM-DD HH:mm:ss'))

  const date1 = new Date(m1.format('YYYY-MM-DD HH:mm:ss'))
  const date2 = new Date(m2.format('YYYY-MM-DD HH:mm:ss'))

  const q2 = query(collection(db, 'usersRolls'),where('date' ,'>=' ,date1),where('date' ,'<=' ,date2),where('wallet', '==', wallet), limit(80));
  try {
    const data = await getDocs(q2)
    let d = []

    let totalTickets = 0
    let totalRolls = data.size

    if(totalRolls >= 30) {
      totalTickets = 1
    }
    if(totalRolls >= 50) {
      totalTickets = 2
    }
    if(totalRolls >= 80) {
      totalTickets = 3
    }

    res.status(200).json({
      tickets: totalTickets
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      tickets: 0
    });
  }

}
