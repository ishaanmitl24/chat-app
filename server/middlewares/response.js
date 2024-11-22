const responses = (req, res, next) => {
  res.invalid = ({ msg, err = null }) =>
    res.status(422).json({ msg, ok: false, data: null, err });

  res.success = ({ msg, data, err = null, status = 200 }) =>
    res.status(status).json({ msg, ok: true, data, err });

  res.unauthorized = ({ msg, data, err = null }) =>
    res.status(401).json({ msg, ok: false, data, err });

  res.failure = ({ msg, data, err = null }) =>
    res.status(200).json({ msg, ok: false, data, err });

  res.internalServerError = ({ msg, data, err = null }) =>
    res.status(500).json({ msg, ok: false, data, err });
  next();
};

module.exports = responses;
