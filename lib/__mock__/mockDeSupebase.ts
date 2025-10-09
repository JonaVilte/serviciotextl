export const supabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({
    data: {
      id: '1',
      fecha_emision: '1999-09-10',
      estado: 'completado',
      total: 2700,
      usuario: { nombre: 'Mario Bargas' },
    },
    error: null,
  }),
};
