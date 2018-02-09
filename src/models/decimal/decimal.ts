const DECIMAL_SEPARATOR = '.';
function as_integer(number) {
    number = String(number);

    var value,
        exp,
        tokens = number.split(DECIMAL_SEPARATOR),
        integer = tokens[0],
        fractional = tokens[1];

    if (!fractional) {
        var trailing_zeros = integer.match(/0+$/);

        if (trailing_zeros) {
            var length = trailing_zeros[0].length;
            value = integer.substr(0, integer.length - length);
            exp = length;
        } else {
            value = integer;
            exp = 0;
        }
    } else {
        value = parseInt(number.split(DECIMAL_SEPARATOR).join(''), 10);
        exp = fractional.length * -1;
    }

    return {
        'value': value,
        'exp': exp
    };
};

function zero(exp) {
    return new Array(exp + 1).join('0');
};

function neg_exp(str, position) {
    position = Math.abs(position);

    var offset = position - str.length;
    var sep = DECIMAL_SEPARATOR;

    if (offset >= 0) {
        str = zero(offset) + str;
        sep = '0.';
    }

    var length = str.length;
    var head = str.substr(0, length - position);
    var tail = str.substring(length - position, length);
    return head + sep + tail;
};


function pos_exp(str, exp) {
    var zeros = zero(exp);
    return String(str + zeros);
};

function format(num, exp) {
    num = String(num);
    var func = exp >= 0 ? pos_exp : neg_exp;
    return func(num, exp);
};

export class Decimal {
    num;
    internal;
    as_int;
    constructor(num) {
        this.num = num;
        this.internal = String(this.num);
        this.as_int = as_integer(this.internal);
    }

    add(target) {
        let operands = [this, new Decimal(target)];
        operands.sort(function (x, y) { return x.as_int.exp - y.as_int.exp; });

        let smallest = operands[0].as_int.exp;
        let biggest = operands[1].as_int.exp;

        let x = Number(format(operands[1].as_int.value, biggest - smallest));
        let y = Number(operands[0].as_int.value);

        let result = String(x + y);

        return new Decimal(format(result, smallest));
    };

    sub(target) {
        return new Decimal(this.add(target * -1));
    };

    mul(target) {
        target = new Decimal(target);
        let result = String(this.as_int.value * target.as_int.value);
        let exp = this.as_int.exp + target.as_int.exp;

        return new Decimal(format(result, exp));
    };

    div(target) {
        let targetT: Decimal = new Decimal(target);

        let smallest = Math.min(this.as_int.exp, targetT.as_int.exp);

        let x: any = this.mul(Math.pow(10, Math.abs(smallest)));
        let y: any = targetT.mul(Math.pow(10, Math.abs(smallest)));

        return new Decimal(x / y);
    };

    toString() {
        return this.internal;
    };

    toNumber() {
        return Number(this.internal);
    }
}