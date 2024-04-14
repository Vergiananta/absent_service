const jwt = require("jsonwebtoken");
async function listAbsenceByEmployee(req, res, service) {
  if (req.query.pageNo && req.query.rowPage) {
    let findListAbsence = await service.findAllAbsenceEmployee(
      req.query.pageNo,
      req.query.rowPage
    );
    res.send({ data: findListAbsence });
  }
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
    res.send(absenceToday);
  }
}
module.exports = { listAbsenceByEmployee, findAbsenceToday };
