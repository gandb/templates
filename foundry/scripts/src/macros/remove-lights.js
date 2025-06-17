const token = canvas.tokens.controlled[0];
if (!token) return ui.notifications.warn("Selecione um token.");

await token.document.update({
  light: {
    bright: 0,
    dim: 0,
    color: null,
    animation: { type: null, speed: 0, intensity: 0 }
  }
});
ui.notifications.info("Efeito de luz de tocha removido.");