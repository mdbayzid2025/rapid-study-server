import Setting from "../Schema/SettingSchema.js";


// GET setting (assumes only one)
export const getSetting = async (req, res) => {
  try {
    const setting = await Setting.find();
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch setting', error });
  }
};

// GET setting (assumes only one)
export const deleteSetting = async (req, res) => {
  const {id} = req.params;
  try {
    const deleteSetting = await Setting.findByIdAndDelete(id);
    res.status(200).json(deleteSetting);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch setting', error });
  }
};

// CREATE setting
export const createSetting = async (req, res) => {
  try {

    const shopInfo = new Setting(req.body);
    await shopInfo.save();
    
    console.log("uuuuu", shopInfo);
    return res.status(201).json(shopInfo);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create setting', error });
  }
};

// UPDATE setting
export const updateSetting = async (req, res) => {

  console.log("uuuu", req.body);
  const {id} = req.params;
  try {
    const updated = await Setting.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, // create if not exists
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update setting', error });
  }
};