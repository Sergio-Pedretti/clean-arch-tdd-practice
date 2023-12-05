// @ts-nocheck
export function validate(cpf) {
  if (guardCheckCPF(cpf)) return false;
  cpf = sanitizeCPF(cpf);
  if (checkRepeated(cpf)) return false;
  try {
    let firstVerifier = 0,
      secondVerifier = 0;
    let dg1 = 0,
      dg2 = 0,
      rest = 0;
    let digito;
    let nDigResult;
    for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
      digito = parseInt(cpf.substring(nCount - 1, nCount));
      firstVerifier = firstVerifier + (11 - nCount) * digito;
      secondVerifier = secondVerifier + (12 - nCount) * digito;
    }
    rest = firstVerifier % 11;
    dg1 = checkRest(rest);
    secondVerifier += 2 * dg1;
    rest = secondVerifier % 11;
    dg2 = checkRest(rest);
    let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
    nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;
  } catch (e) {
    console.error("Erro !" + e);
    return false;
  }
}

function guardCheckCPF(cpf: string): boolean {
  if (
    (cpf === null || cpf === undefined) &&
    (cpf.length < 11 || cpf.length > 14)
  ) {
    return true;
  }
  return false;
}

function sanitizeCPF(cpf: string): string {
  return cpf
    .replace(".", "")
    .replace(".", "")
    .replace("-", "")
    .replace(" ", "");
}

function checkRepeated(cpf: string): boolean {
  if (cpf.split("").every((c) => c === cpf[0])) {
    return true;
  }
  return false;
}

function checkRest(rest: number): number {
  return rest < 2 ? 0 : 11 - rest;
}
