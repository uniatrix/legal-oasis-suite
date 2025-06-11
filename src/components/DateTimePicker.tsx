import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, Clock, CheckIcon, XCircle } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface for booked slots passed from Supabase
interface BookedSlot {
    booked_date: string; // YYYY-MM-DD
    booked_time: string; // HH:MM
}

interface DateTimePickerProps {
    onSelect: (date: Date, time: string) => void;
    availableTimes?: string[];
    disabledDates?: Date[];
    className?: string;
    bookedSlots?: BookedSlot[]; // Added bookedSlots prop
}

const DEFAULT_AVAILABLE_TIMES = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
    onSelect,
    availableTimes = DEFAULT_AVAILABLE_TIMES,
    disabledDates = [],
    className = '',
    bookedSlots = [] // Initialize with empty array if not provided
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const isDateDisabled = (date: Date) => {
        return isBefore(date, startOfDay(new Date())) ||
            disabledDates.some(disabledDate => isSameDay(date, disabledDate));
    };

    const handleDateSelect = (date: Date) => {
        if (!isDateDisabled(date)) {
            setSelectedDate(date);
            setSelectedTime(null);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onSelect(selectedDate, selectedTime);
        }
    };

    return (
        <div className={`bg-law-black-lighter/80 backdrop-blur-md rounded-xl border border-law-blue-dark/30 shadow-2xl p-8 sm:p-10 max-w-3xl mx-auto ${className}`}>
            <div className="space-y-8">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handlePreviousMonth}
                        className="p-3 rounded-lg hover:bg-law-gold/10 text-law-gold transition-all duration-300 ease-in-out"
                        aria-label="Mês anterior"
                    >
                        <ChevronLeftIcon size={32} />
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-law-white">
                        {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="p-3 rounded-lg hover:bg-law-gold/10 text-law-gold transition-all duration-300 ease-in-out"
                        aria-label="Próximo mês"
                    >
                        <ChevronRightIcon size={32} />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 sm:gap-3">
                    {/* Weekday headers */}
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div
                            key={day}
                            className="h-12 flex items-center justify-center text-base sm:text-lg font-medium text-law-gold"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {daysInMonth.map((date, idx) => {
                        const isDisabled = isDateDisabled(date);
                        const isSelected = selectedDate && isSameDay(date, selectedDate);
                        const isTodayDate = isToday(date);

                        return (
                            <button
                                key={idx}
                                onClick={() => handleDateSelect(date)}
                                disabled={isDisabled}
                                className={`
                                    h-12 sm:h-14 rounded-lg flex items-center justify-center text-base sm:text-lg font-medium
                                    transition-all duration-300 ease-in-out transform
                                    ${isDisabled ? 'text-gray-500 cursor-not-allowed opacity-50' : 'hover:scale-110 hover:shadow-lg'}
                                    ${isSelected ? 'bg-law-gold text-law-black font-semibold shadow-lg scale-105' : 'text-law-white'}
                                    ${isTodayDate && !isSelected ? 'border-2 border-law-gold/50' : ''}
                                    ${!isDisabled && !isSelected ? 'hover:bg-law-gold/20' : ''}
                                `}
                            >
                                {format(date, 'd')}
                            </button>
                        );
                    })}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                    <div className="mt-8 space-y-6">
                        <h3 className="text-xl sm:text-2xl font-medium text-law-white flex items-center gap-3">
                            <Clock size={24} className="text-law-gold" />
                            Horários Disponíveis para {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {availableTimes.map((time) => {
                                const isSlotBooked = selectedDate && bookedSlots.some(
                                    slot => slot.booked_date === format(selectedDate, 'yyyy-MM-dd') && slot.booked_time === time
                                );

                                return (
                                    <button
                                        key={time}
                                        onClick={() => !isSlotBooked && handleTimeSelect(time)}
                                        disabled={isSlotBooked}
                                        className={`
                                            py-4 px-6 rounded-lg text-lg sm:text-xl font-medium
                                            transition-all duration-300 ease-in-out transform
                                            flex items-center justify-center gap-2 
                                            ${isSlotBooked
                                                ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed opacity-70 border-gray-500/30'
                                                : selectedTime === time
                                                    ? 'bg-law-gold text-law-black shadow-lg scale-105 border-law-gold'
                                                    : 'bg-law-black/40 text-law-white hover:bg-law-gold/20 hover:scale-105 border-law-blue-dark/30'
                                            }
                                        `}
                                    >
                                        {isSlotBooked && <XCircle size={20} className="mr-1 flex-shrink-0" />}
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Confirm Button */}
                {selectedDate && selectedTime && (
                    <button
                        onClick={handleConfirm}
                        className="w-full mt-8 group flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-md text-xl font-semibold text-law-black bg-law-gold hover:bg-law-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-law-black-lighter focus:ring-law-gold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                    >
                        <CheckIcon size={24} className="mr-3" />
                        Confirmar Agendamento
                    </button>
                )}
            </div>
        </div>
    );
};

export default DateTimePicker;