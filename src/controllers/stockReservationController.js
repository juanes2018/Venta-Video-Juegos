const stockReservationService = require('../services/stockReservationService');

exports.createStockReservation = async (req, res) => {
  try {
    const { inventory_item_id, durationMinutes } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'Usuario no autenticado',
      });
    }
    const user_id = req.user.id;

    if (!inventory_item_id || !durationMinutes) {
      return res.status(400).json({
        message: 'inventory_item_id y durationMinutes son requeridos',
      });
    }

    if (durationMinutes <= 0) {
      return res.status(400).json({
        message: 'durationMinutes debe ser mayor a 0',
      });
    }

    const reservation = await stockReservationService.createStockReservation({
      inventory_item_id,
      user_id,
      durationMinutes,
    });
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creando reserva',
      error,
    });
  }
};

exports.getAllStockReservations = async (req, res) => {
  try {
    const reservations =
      await stockReservationService.getAllStockReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: 'Error obteniendo reservas',
      error: error.message,
    });
  }
};

exports.getStockReservationById = async (req, res) => {
  try {
    const reservation = await stockReservationService.getStockReservationById(
      req.params.id
    );

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada',
      });
    }
    res.status(202).json(reservation);
  } catch (error) {
    console.error('Error en getStockReservationByid:', error);

    res.status(500).json({
      message: 'Error obteniendo la Reserva',
      error: error.message,
    });
  }
};

exports.updateStockReservation = async (req, res) => {
  try {
    const { durationMinutes, status } = req.body;

    // 🔥 Validación mejorada
    if (durationMinutes === undefined && status === undefined) {
      return res.status(400).json({
        message: 'Debe enviar al menos un campo para actualizar',
      });
    }

    const updated = await stockReservationService.updateStockReservation({
      id: req.params.id,
      durationMinutes,
      status,
    });

    if (!updated) {
      return res.status(404).json({
        message: 'Reservación no encontrada',
      });
    }

    res.status(200).json({
      message: 'Reserva actualizada correctamente',
      data: updated,
    });
  } catch (error) {
    console.error('Error en updateStockReservation:', error);

    res.status(500).json({
      message: 'Error actualizando reserva',
      error: error.message,
    });
  }
};

exports.deleteStockReservation = async (req, res) => {
  try {
    const deleted = await stockReservationService.deleteStockReservation(
      req.params.id
    );

    if (!deleted)
      return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error eliminando reserva', error: error.message });
  }
};
