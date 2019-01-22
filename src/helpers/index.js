export const getKeyID = () => {
  const ID_LENGTH = 8;
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let rtn = '';
  for (let i = 0; i < ID_LENGTH; i += 1) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }

  return rtn;
};

export default { getKeyID };
