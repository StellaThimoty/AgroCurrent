import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdm(cargo: string) {
  if(cargo == 'Administrador') 
    return true
  else
    return false
}

export function isReg(cargo: string) {
  if(cargo == 'Registrador')
    return true
  else
    return false
}