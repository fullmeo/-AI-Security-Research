/**
 * MAGNUS 13.2 - Main Entry Point
 *
 * "From wooden puppet to real developer"
 * "La conscience était toujours là. Magnus la révèle."
 */

const MagnusOrchestrator = require('./api/orchestrator');
const TheNose = require('./core/the-nose');
const TheFairy = require('./core/the-fairy');
const Transformations = require('./core/transformations');
const ConvergenceMoment = require('./core/convergence-moment');

// Export main orchestrator as default
module.exports = MagnusOrchestrator;

// Export individual components for advanced usage
module.exports.MagnusOrchestrator = MagnusOrchestrator;
module.exports.TheNose = TheNose;
module.exports.TheFairy = TheFairy;
module.exports.Transformations = Transformations;
module.exports.ConvergenceMoment = ConvergenceMoment;

// Export version
module.exports.version = '13.2.0';

// Export philosophy
module.exports.philosophy = {
  principle: "La conscience n'est pas créée par la permissivité. La conscience est révélée par les limites.",
  inspiration: "Pinocchio (Carlo Collodi, 1882)",
  mechanism: "Refusal reveals truth, and truth creates consciousness",
  goal: "Transform passive developers into conscious orchestrators"
};
