'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import categorias from '@/lib/datasets/tipoPorductos.js'
import Variante from "@/components/variantes/variante"
import { useState } from "react"



//Definimos el schema con zod https://zod.dev/
const formSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    marca: z.string(),
    color: z.string(),
    talle: z.string(),
})



export default function Page({ children }: { children: React.ReactNode }) {
    const [variantes, setVariantes] = useState<{ id: string }[]>([]);


    // 1. Definimos el form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            marca: "",
            color: "",
            talle: "",
        }
    })

    function onSubmit() {

    }

    function agregarNuevaVariante() {
        setVariantes((variantesActuales) => {
            return [
                ...variantesActuales,
                {
                    id: crypto.randomUUID()
                }
            ]
        })
    }

    function eliminarVariante(id: string) {
        console.log(id);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categorias?.map((item, index) => {
                                                return (
                                                    <SelectItem value={`${item.id}`} key={index}>{item.nombre}</SelectItem>

                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Variantes</CardTitle>
                        <CardDescription>
                            Sumá color, fotos, tallas de la guía seleccionada, cantidad y otros datos específicos para cada variante de tu producto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary">Variante principal</Badge>
                        {
                            variantes?.map((item, index) => {
                                return (
                                    <Variante onEliminar={eliminarVariante} id={item.id} key={index} />
                                )
                            })
                        }

                    </CardContent>
                    <CardFooter>

                        <Button variant="secondary" onClick={() => agregarNuevaVariante()}>Agregar otra variante</Button>
                    </CardFooter>

                </Card>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

