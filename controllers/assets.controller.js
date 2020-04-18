exports.handleAssets = async (req, res) => {
  try {
    const {idCardPicture , cameraPicture} = req.body;
    if (!idCardPicture || !cameraPicture) {
      console.log('FOTOS', {idCardPicture , cameraPicture})
      res.status(400).send({
        success: false,
        code: 'BAD_REQUEST',
        message: 'Assets not received.'
      });
    } else {
      res.status(200).send({
        success: true,
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
    });
  }
}
