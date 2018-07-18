const SvgRingGeometryHelpers = {};

Object.assign(SvgRingGeometryHelpers, {
  calculateArc: (percentageOfCircle) => {
    return percentageOfCircle * (0.02 * Math.PI);
  },
  calculateRightArcXTerminus: (radians) => {
    const nominalX = 96 * Math.sin(radians);
    return 100 + nominalX;
  },

  calculateRightArcYTerminus: (radians) => {
    const nominalY = 96 * (1 - Math.cos(radians));
    return Math.abs(-4 - nominalY);
  },

  calculateLeftArcXTerminus: (radians) => {
    const nominalX = 96 * Math.sin(radians);
    return 100 - nominalX;
  },

  calculateLeftArcYTerminus: (radians) => {
    const nominalY = -96 * (1 - Math.cos(radians));
    return 196 - Math.abs(nominalY);
  },
  calculateRight: n =>
    [
      SvgRingGeometryHelpers.calculateRightArcXTerminus,
      SvgRingGeometryHelpers.calculateRightArcYTerminus,
    ].map(calcFn => calcFn(SvgRingGeometryHelpers.calculateArc(n))),

  calculateLeft: n =>
    [
      SvgRingGeometryHelpers.calculateLeftArcXTerminus,
      SvgRingGeometryHelpers.calculateLeftArcYTerminus,
    ].map(calcFn => calcFn(SvgRingGeometryHelpers.calculateArc(n))),
});

export default SvgRingGeometryHelpers;
