async function listAbsenceByEmployee(req, res, service) {
  const id = req.param.id;
  let findListAbsence = await service.findAllAbsenceEmployee(id);
  res.send(findListAbsence);
}
module.exports = { listAbsenceByEmployee };
