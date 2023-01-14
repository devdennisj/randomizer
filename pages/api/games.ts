import axios from 'axios';
import { load } from 'cheerio';
import { Game } from '../../types/game.types';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  games: Game[]
}

const handler = async (req: NextApiRequest,
  res: NextApiResponse<Data>) => {

  const { profile } = req.query;
  const client = axios.create({
    baseURL: profile as string,
  });
  const { data } = await client.get('/');

  const $ = load(data);
  const allGames: Game[] = [];

  $('.game_title > a:first-child').each((_idx, el) => {
    const gameTitle = $(el).text();
    const link = $(el).attr('href');
    allGames.push({
      title: gameTitle,
      link: link || '',
    });
  });

  res.status(200).json({ games: allGames });
}

export default handler