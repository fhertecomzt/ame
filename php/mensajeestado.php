<!--Mostrar mensaje de exito o error-->
<?php if (isset($error) || isset($success)): ?>
  <p class="<?php echo isset($error) ? 'mensaje-error' : 'mensaje-exito'; ?>">
    <?php echo htmlspecialchars($error ?? $success); ?>
  </p>
<?php endif; ?>