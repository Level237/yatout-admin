'use client'

import { LayoutContainer } from "@/features/dashboard/components/layout-container";
import { ReservationList } from '@/features/dashboard/components/reservations/reservation-list'

export default function ReservationsPage() {
  return (
    <LayoutContainer>
      <ReservationList />
    </LayoutContainer>
  )
}
