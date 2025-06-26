import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  searchTerm: string = '';
  filteredAppointments: Appointment[] = [];

  showValidationError: boolean = false;
  showDeletedSuccessfully: boolean = false;
  showSuccessMessage: boolean = false;
  showNoSearchFound: boolean = false;

  appointments: Appointment[] = [];

  ngOnInit(): void {
    const storedAppointments = localStorage.getItem('appointments');
    this.appointments = storedAppointments
      ? JSON.parse(storedAppointments)
      : [];
    this.filteredAppointments = this.appointments;
  }

  addAnAppointment() {
    if (
      this.newAppointmentTitle.trim().length === 0 &&
      this.newAppointmentDate
    ) {
      this.showValidationError = true;
      setTimeout(() => {
        this.showValidationError = false;
      }, 2000);
    } else {
      this.showValidationError = false;
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      this.updateAppointmentsLocalStorage();

      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    this.updateAppointmentsLocalStorage();
    this.filteredAppointments = this.appointments;
    this.showDeletedSuccessfully = true;
    setTimeout(() => {
      this.showDeletedSuccessfully = false;
    }, 2000);
  }

  updateAppointmentsLocalStorage() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  searchAppointments() {
    this.searchTerm = this.searchTerm.toLowerCase();
    this.filteredAppointments = this.appointments.filter((appointment) =>
      appointment.title.toLowerCase().includes(this.searchTerm)
    );
    this.filteredAppointments.length === 0
      ? (this.showNoSearchFound = true)
      : (this.showNoSearchFound = false);
  }
}
