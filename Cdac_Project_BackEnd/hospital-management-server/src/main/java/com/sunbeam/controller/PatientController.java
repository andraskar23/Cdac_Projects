package com.sunbeam.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dtos.ChargesCalculationBeanPatient;
import com.sunbeam.dtos.MedicineAssignedDataBackinBean;
import com.sunbeam.dtos.PatientDataBacking;
import com.sunbeam.dtos.Response;
import com.sunbeam.services.PatientServices;
@EnableGlobalMethodSecurity(prePostEnabled = true,jsr250Enabled = true)
@CrossOrigin("*")
@RestController
@RequestMapping("/api/patient")
public class PatientController {
	@Autowired
	PatientServices pServices;
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/addPatient")
	public ResponseEntity<?> addPatient(@RequestBody PatientDataBacking patientData) {
		int updateCount = pServices.addPatient(patientData);
		if (updateCount == 1)
			return Response.success("added");
		return Response.error("adding failed");
	}
	
	@RolesAllowed({"ROLE_RECEPTION","ROLE_DOCTOR","ROLE_ACCOUNTANT"})
	@GetMapping("/getAllPatients")
	public ResponseEntity<?> getAllPatients() {
		List<PatientDataBacking> patients = pServices.getAllPatients();

		return Response.success(patients);
	}


	@RolesAllowed({"ROLE_RECEPTION","ROLE_DOCTOR","ROLE_ACCOUNTANT","ROLE_PATIENT"})
	@GetMapping("/getPatient/{id}")
	public ResponseEntity<?> getPatientById(@PathVariable("id") int patientId) {
		PatientDataBacking patient = pServices.getPatientById(patientId);
		if (patient != null)
			return Response.success(patient);
		return Response.success("failed invalid patient id");

	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_DOCTOR"})
	@DeleteMapping("/removePatient/{id}")
	public ResponseEntity<?> deletePatientById(@PathVariable("id") int patientId) {
		pServices.removePatientById(patientId);
		return Response.success("success removed");

	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_DOCTOR","ROLE_ACCOUNTANT"})
	@PostMapping("/updatePatient")
	public void updatePatient(@RequestBody PatientDataBacking patientData) {
		pServices.updatePatientDetails(patientData);
	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_DOCTOR","ROLE_PATIENT"})
	@GetMapping("/getMedicines/{id}")
	public ResponseEntity<?> getMedicineByPatId(@PathVariable("id") int patientId) {
		List<MedicineAssignedDataBackinBean> medicines = pServices.getMedicineByPatId(patientId);
		if (medicines != null)
			return Response.success(medicines);
		return Response.success("failed invalid medicines id");

	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_ACCOUNTANT","ROLE_PATIENT"})
	@GetMapping("/getCharges/{id}")
	public ResponseEntity<?> getChargesByPatId(@PathVariable("id") int patientId) {
		ChargesCalculationBeanPatient patientTotalCharges = pServices.calculateChargesByPatId(patientId);
		if (patientTotalCharges != null)
			return Response.success(patientTotalCharges);
		return Response.error("INVALID_PATIENT_ID");

	}
	@RolesAllowed({"ROLE_ACCOUNTANT"})
	@PostMapping("/updatePatientPaymentStatus")
	public void updatePatientPaymentStatus(@RequestBody PatientDataBacking patientData) {
		pServices.updatePaymentStatusByPatId(patientData);
	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/bedExists")
	public ResponseEntity<?> checkIfBedIsFree(@RequestBody PatientDataBacking bedData) {
		Boolean bedStatus = pServices.checkIfBedAvailable(bedData);
		if (bedStatus == true)
			return Response.success("BED_NOT_AVAILABLE");
		else
			return Response.success("BED_AVAILABLE");

	}

}
