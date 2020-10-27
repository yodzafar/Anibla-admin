import axios, { execute } from './index';

export default {
  createMember: (data) => execute(axios.post('/member', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllMember: () => execute(axios.get('/member')),
  getMember: (id) => execute(axios.get(`/member/${id}`)),
  removeMember: (id) => execute(axios.delete(`/member/${id}`))
}
