import {useState} from "@/lib/jsx/hooks/useState/useStateImpl";
import {useRef} from "@/lib/jsx/hooks/useRef/useRefImpl";

export const resolveDispatcher = () => {
    return {useState, useRef};
}
