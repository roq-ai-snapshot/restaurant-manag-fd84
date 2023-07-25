import axios from 'axios';
import queryString from 'query-string';
import { SeatingLayoutInterface, SeatingLayoutGetQueryInterface } from 'interfaces/seating-layout';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSeatingLayouts = async (
  query?: SeatingLayoutGetQueryInterface,
): Promise<PaginatedInterface<SeatingLayoutInterface>> => {
  const response = await axios.get('/api/seating-layouts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSeatingLayout = async (seatingLayout: SeatingLayoutInterface) => {
  const response = await axios.post('/api/seating-layouts', seatingLayout);
  return response.data;
};

export const updateSeatingLayoutById = async (id: string, seatingLayout: SeatingLayoutInterface) => {
  const response = await axios.put(`/api/seating-layouts/${id}`, seatingLayout);
  return response.data;
};

export const getSeatingLayoutById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/seating-layouts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeatingLayoutById = async (id: string) => {
  const response = await axios.delete(`/api/seating-layouts/${id}`);
  return response.data;
};
