interface MajorCredits {
  credits: number;
  _brand: "MajorCredits";
}

interface MinorCredits {
  credits: number;
  _brand: "MinorCredits";
}

function sumMajorCredits(
  subject1: MajorCredits,
  subject2: MajorCredits
): MajorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    _brand: "MajorCredits",
  };
}

function sumMinorCredits(
  subject1: MinorCredits,
  subject2: MinorCredits
): MinorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    _brand: "MinorCredits",
  };
}
