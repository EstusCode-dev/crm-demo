"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, MoreHorizontal } from "lucide-react"
import { DealForm } from "@/components/sales/deal-form"
import { mockPipeline } from "@/lib/mock-data"

export function SalesPipeline() {
  const [pipeline, setPipeline] = useState(mockPipeline)
  const [isAddDealOpen, setIsAddDealOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same stage
      const stage = pipeline.find((s) => s.id === source.droppableId)
      const newDeals = Array.from(stage.deals)
      const [movedDeal] = newDeals.splice(source.index, 1)
      newDeals.splice(destination.index, 0, movedDeal)

      setPipeline(pipeline.map((s) => (s.id === source.droppableId ? { ...s, deals: newDeals } : s)))
    } else {
      // Moving between stages
      const sourceStage = pipeline.find((s) => s.id === source.droppableId)
      const destStage = pipeline.find((s) => s.id === destination.droppableId)

      const sourceDeals = Array.from(sourceStage.deals)
      const destDeals = Array.from(destStage.deals)

      const [movedDeal] = sourceDeals.splice(source.index, 1)
      destDeals.splice(destination.index, 0, { ...movedDeal, stage: destStage.name })

      setPipeline(
        pipeline.map((s) => {
          if (s.id === source.droppableId) return { ...s, deals: sourceDeals }
          if (s.id === destination.droppableId) return { ...s, deals: destDeals }
          return s
        }),
      )
    }
  }

  const handleAddDeal = (newDeal) => {
    const updatedPipeline = pipeline.map((stage) => {
      if (stage.id === selectedStage) {
        return {
          ...stage,
          deals: [
            ...stage.deals,
            {
              id: `deal-${Date.now()}`,
              title: newDeal.title,
              client: newDeal.client,
              value: newDeal.value,
              stage: stage.name,
            },
          ],
        }
      }
      return stage
    })

    setPipeline(updatedPipeline)
    setIsAddDealOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Pipeline de Ventas</h2>
        <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nueva Oportunidad</DialogTitle>
              <DialogDescription>Crea una nueva oportunidad de venta.</DialogDescription>
            </DialogHeader>
            <DealForm onSubmit={handleAddDeal} onCancel={() => setIsAddDealOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipeline.map((stage) => (
            <div key={stage.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{stage.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedStage(stage.id)
                    setIsAddDealOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-muted/50 rounded-md p-2 flex-1 min-h-[500px]"
                  >
                    {stage.deals.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 cursor-grab active:cursor-grabbing"
                          >
                            <CardHeader className="p-3 pb-0">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm font-medium">{deal.title}</CardTitle>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-3 pt-1">
                              <p className="text-xs text-muted-foreground">{deal.client}</p>
                              <p className="text-sm font-semibold mt-1">${deal.value.toLocaleString()}</p>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

