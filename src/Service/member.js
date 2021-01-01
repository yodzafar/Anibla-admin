import axios, { execute } from './index';

export default {
  createMember: (data) => execute(axios.post('/member', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllMember: () => execute(axios.get('/member')),
  removeMember: (id) => execute(axios.delete(`/member/${id}`)),
  updateMember: ({id, data}) => execute(axios.put(`/member/${id}`, data)),
  updateMemberAvatar: ({id, data}) => execute(axios.put(`/member/${id}/image`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }))
}
