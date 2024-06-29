const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config(); // to use environment variables
const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect('mongodb+srv://aparaedge:JlmEHi2tHm3jI0rM@clusterdev.vlpgbxf.mongodb.net/health-care-app?retryWrites=true&w=majority&appName=ClusterDev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const doctorSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
  const patientSchema = new mongoose.Schema({
    patientId: String,
    name: String,
    mobile: String,
    age: Number,
    address: String,
    files: [
      {
        url: String,
        date: String,
        uploadedBy: String,
      },
    ],
    appointments: {
      type: Object, // Use plain object instead of Map
      default: {},
    },
  });
  
  const appointmentCountSchema = new mongoose.Schema({
    date: String,
    count: Number,
  });
  
  const Doctor = mongoose.model('Doctor', doctorSchema);
  const Patient = mongoose.model('Patient', patientSchema);
  const AppointmentCount = mongoose.model('AppointmentCount', appointmentCountSchema);
  
  // Register patient
  app.post('/api/patients/register', async (req, res) => {
    const { name, mobile, age, address } = req.body;
    try {
      const existingPatient = await Patient.findOne({ mobile });
      if (existingPatient) {
        return res.status(400).json({ message: 'Mobile number already registered' });
      }
  
      const patientCount = await Patient.countDocuments();
      const newPatient = new Patient({
        patientId: `patient${patientCount + 1}`,
        name,
        mobile,
        age,
        address,
        files: [],
        appointments: {}, // Initialize empty appointments
      });
  
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ message: 'Error registering new patient' });
    }
  });
  
  // Fetch all patients
  app.get('/api/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Fetch appointment count for today
  app.get('/api/appointments/count', async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const appointmentCount = await AppointmentCount.findOne({ date: today });
      res.json({ count: appointmentCount ? appointmentCount.count : 0 });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Doctor login
  app.post('/api/doctor/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const doctor = await Doctor.findOne({ username, password });
      if (doctor) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Fetch patient by mobile number
  app.post('/api/patients', async (req, res) => {
    const { mobile } = req.body;
    try {
      const patient = await Patient.findOne({ mobile });
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patient data' });
    }
  });
  
  // Upload file for a patient
  app.post('/api/patients/upload-file', upload.single('file'), async (req, res) => {
    const { patientId, uploadedBy } = req.body;
    console.log(req.file)
    try {
      const patient = await Patient.findOne({ patientId });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      const newFile = {
        url: req.file.path, // Assuming fileUrl is the URL of the stored file
        date: new Date().toISOString().split('T')[0], // Get today's date in format YYYY-MM-DD
        uploadedBy: uploadedBy,
      };
  
      patient.files.push(newFile);
      await patient.save();
  
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file' });
    }
  });
  
  // Generate appointment for a patient
  app.post('/api/patients/generate-appointment', async (req, res) => {
    const { patientId } = req.body;
    const today = new Date().toISOString().split('T')[0];
  
    try {
      // Find the patient
      const patient = await Patient.findOne({ patientId });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Check if appointment already exists for today
      if (patient.appointments && patient.appointments[today]) {
        return res.status(400).json({ message: 'Appointment already generated for today' });
      }
  
      // Increment appointment count for today
      let appointmentCount = await AppointmentCount.findOne({ date: today });
      if (!appointmentCount) {
        appointmentCount = new AppointmentCount({
          date: today,
          count: 1,
        });
      } else {
        appointmentCount.count += 1;
      }
  
      // Generate new appointment number
      const newAppointmentNumber = appointmentCount.count;
      const newAppointment = `APT-${newAppointmentNumber}`;
  
      // Update patient's appointments
      patient.appointments = { ...patient.appointments, [today]: newAppointment };
  
      // Save patient and appointment count
      await patient.save();
      await appointmentCount.save();
  
      res.status(200).json({ appointmentNumber: newAppointment });
    } catch (error) {
      console.error('Error generating appointment:', error);
      res.status(500).json({ message: 'Error generating appointment' });
    }
  });

  app.get('/api/patients/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const patient = await Patient.findOne({"patientId" : id});
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

