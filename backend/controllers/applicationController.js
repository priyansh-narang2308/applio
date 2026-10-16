import Application from "../models/Application.js";

export const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      jobLink,
      salary,
      applicationDate,
      appliedDate,
      status,
      interviewDate,
      notes,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const application = new Application({
      company,
      role,
      jobLink: jobLink || "",
      salary: salary || "",
      applicationDate: applicationDate || appliedDate || Date.now(),
      status: status || "Applied",
      interviewDate: interviewDate || null,
      notes: notes || "",
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      jobLink,
      salary,
      applicationDate,
      appliedDate,
      status,
      interviewDate,
      notes,
    } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (company !== undefined) application.company = company;
    if (role !== undefined) application.role = role;
    if (jobLink !== undefined) application.jobLink = jobLink;
    if (salary !== undefined) application.salary = salary;
    if (applicationDate !== undefined)
      application.applicationDate = applicationDate;
    else if (appliedDate !== undefined)
      application.applicationDate = appliedDate;
    if (status !== undefined) application.status = status;
    if (interviewDate !== undefined) application.interviewDate = interviewDate;
    if (notes !== undefined) application.notes = notes;

    const updatedApplication = await application.save();
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewDate } = req.body;
    const validStatuses = ["Applied", "Interview", "Offer", "Rejected"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    if (interviewDate !== undefined) {
      application.interviewDate = interviewDate;
    }

    const updatedApplication = await application.save();
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const applied = await Application.countDocuments({ status: "Applied" });
    const interviews = await Application.countDocuments({
      status: "Interview",
    });
    const offers = await Application.countDocuments({ status: "Offer" });
    const rejected = await Application.countDocuments({ status: "Rejected" });

    res.status(200).json({
      total,
      applied,
      interviews,
      offers,
      rejected,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
