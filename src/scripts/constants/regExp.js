export default {
    USER_REG_EXP: /^\D[\S]+/i,
    PASS_REG_EXP: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s,
    NAME_REG_EXP: /^[a-zA-Z]+$/,
};
