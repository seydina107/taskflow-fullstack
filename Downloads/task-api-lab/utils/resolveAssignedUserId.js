const mongoose = require('mongoose');
const resolveAssignedUserId = async (assignedUserId) => {
 if (!assignedUserId || assignedUserId === '') {
   return null;
 }
 if (!mongoose.Types.ObjectId.isValid(assignedUserId)) {
   return { error: 'assignedUserId invalide' };
 }
 return assignedUserId;
};
module.exports = { resolveAssignedUserId };