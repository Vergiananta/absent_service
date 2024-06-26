const jwt = require("jsonwebtoken");
async function listAbsenceByEmployee(req, res, service) {
  let findListAbsence = await service.findAllAbsenceEmployee();
  res.send({ data: findListAbsence });
}

async function findAbsenceToday(req, res, service) {
  let request = {};
  const { authorization } = req.headers;
  if (authorization.startsWith("Bearer")) {
    const token = authorization.slice(7, authorization.length);
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      request.userId = decoded.id;
    });
    let absenceToday = await service.findAbsenceToday(request);
    res.send({ data: absenceToday });
  }
}
module.exports = { listAbsenceByEmployee, findAbsenceToday };
