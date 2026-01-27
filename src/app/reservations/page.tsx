'use client'

import { LayoutContainer } from "@/features/dashboard/components/layout-container";
import { ReservationsList } from '@/features/dashboard/components/reservations/reservation-list'

export default function ReservationsPage() {
  return (
    <LayoutContainer>
      <ReservationsList />
    </LayoutContainer>
  )
}
