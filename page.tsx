"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Activity, Heart, Bot, Plus, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

// Common symptoms list
const commonSymptoms = [
  "Headache",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Joint Pain",
  "Back Pain",
  "Stomach Pain",
  "Other",
]

// Mock recent symptoms data
const mockRecentSymptoms = [
  {
    id: 1,
    symptom: "Headache",
    severity: 4,
    description: "Mild headache after lunch, felt better after rest",
    triggers: "stress, poor sleep",
    date: "2024-01-15",
    patientName: "John Doe",
  },
  {
    id: 2,
    symptom: "Joint Pain",
    severity: 6,
    description: "Knee pain when walking, worse in the morning",
    triggers: "weather, physical activity",
    date: "2024-01-14",
    patientName: "John Doe",
  },
  {
    id: 3,
    symptom: "Fatigue",
    severity: 7,
    description: "Very tired throughout the day, couldn't complete daily tasks",
    triggers: "poor sleep, medication change",
    date: "2024-01-13",
    patientName: "John Doe",
  },
]

export default function SymptomsPage() {
  const [formData, setFormData] = useState({
    symptom: "",
    customSymptom: "",
    severity: "",
    description: "",
    triggers: "",
  })
  const [recentSymptoms] = useState(mockRecentSymptoms)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [showAiHelp, setShowAiHelp] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("Symptom logged")
      setFormData({
        symptom: "",
        customSymptom: "",
        severity: "",
        description: "",
        triggers: "",
      })
      setTimeout(() => setSuccess(""), 3000)
    }, 2000)
  }

  const getSeverityLabel = (severity: number) => {
    if (severity >= 1 && severity <= 3) return "Mild"
    if (severity >= 4 && severity <= 6) return "Moderate"
    if (severity >= 7 && severity <= 8) return "High"
    if (severity >= 9 && severity <= 10) return "Severe"
    return ""
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 1 && severity <= 3) return "bg-green-100 text-green-800 border-green-200"
    if (severity >= 4 && severity <= 6) return "bg-orange-100 text-orange-800 border-orange-200"
    if (severity >= 7 && severity <= 8) return "bg-red-100 text-red-800 border-red-200"
    if (severity >= 9 && severity <= 10) return "bg-red-200 text-red-900 border-red-300"
    return ""
  }

  const getSeverityEmoji = (severity: number) => {
    if (severity >= 1 && severity <= 3) return "😊"
    if (severity >= 4 && severity <= 6) return "😐"
    if (severity >= 7 && severity <= 8) return "😟"
    if (severity >= 9 && severity <= 10) return "😰"
    return ""
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="touch-target" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-senior-lg font-bold text-foreground">Arogya Sathi</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-senior-2xl font-bold text-foreground">Daily Symptom Tracker</h1>
            <p className="text-senior-lg text-muted-foreground">Log your symptoms daily.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Symptom Form */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-senior-xl flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Log New Symptom
                </CardTitle>
                <CardDescription className="text-senior-base">Track how you're feeling today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Symptom Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="symptom" className="text-senior-base font-medium">
                      Select Symptom *
                    </Label>
                    <Select value={formData.symptom} onValueChange={(value) => handleInputChange("symptom", value)}>
                      <SelectTrigger className="text-senior-base h-12 touch-target">
                        <SelectValue placeholder="Choose a symptom" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSymptoms.map((symptom) => (
                          <SelectItem key={symptom} value={symptom} className="text-senior-base">
                            {symptom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Symptom Input */}
                  {formData.symptom === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="customSymptom" className="text-senior-base font-medium">
                        Describe Your Symptom *
                      </Label>
                      <Input
                        id="customSymptom"
                        type="text"
                        placeholder="Enter your symptom"
                        value={formData.customSymptom}
                        onChange={(e) => handleInputChange("customSymptom", e.target.value)}
                        className="text-senior-base h-12 touch-target"
                        required={formData.symptom === "Other"}
                      />
                    </div>
                  )}

                  {/* Severity Scale */}
                  <div className="space-y-4">
                    <Label className="text-senior-base font-medium">Severity Scale (1-10) *</Label>
                    <div className="space-y-3">
                      <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
                        <SelectTrigger className="text-senior-base h-12 touch-target">
                          <SelectValue placeholder="Rate your symptom severity" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => {
                            const severity = i + 1
                            const label = getSeverityLabel(severity)
                            return (
                              <SelectItem key={severity} value={severity.toString()} className="text-senior-base">
                                {severity} - {label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>

                      {/* Severity Guide */}
                      <div className="grid grid-cols-2 gap-2 text-senior-sm">
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">1-3: Mild</div>
                        <div className="p-2 bg-orange-50 border border-orange-200 rounded text-orange-800">
                          4-6: Moderate
                        </div>
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-800">7-8: High</div>
                        <div className="p-2 bg-red-100 border border-red-300 rounded text-red-900">9-10: Severe</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-senior-base font-medium">
                      Describe Your Symptom
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your symptom, when it started, what makes it better/worse"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="text-senior-base min-h-24 resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Triggers */}
                  <div className="space-y-2">
                    <Label htmlFor="triggers" className="text-senior-base font-medium">
                      Possible Triggers
                    </Label>
                    <Input
                      id="triggers"
                      type="text"
                      placeholder="e.g., stress, food, weather, poor sleep"
                      value={formData.triggers}
                      onChange={(e) => handleInputChange("triggers", e.target.value)}
                      className="text-senior-base h-12 touch-target"
                    />
                    <p className="text-senior-sm text-muted-foreground">Separate multiple triggers with commas</p>
                  </div>

                  {/* AI Help Button */}
                  <Card className="bg-secondary/30 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-senior-base font-medium text-foreground">Trouble deciding?</h4>
                          <p className="text-senior-sm text-muted-foreground">
                            Get AI help to identify your symptom and severity
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="touch-target bg-transparent"
                          onClick={() => setShowAiHelp(!showAiHelp)}
                        >
                          <Bot className="h-4 w-4 mr-2" />
                          AI Help
                        </Button>
                      </div>
                      {showAiHelp && (
                        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                          <p className="text-senior-sm text-primary">
                            AI-guided symptom assessment will be available in the next update. For now, please use the
                            form above to log your symptoms.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full text-senior-base h-12 touch-target" disabled={isLoading}>
                    {isLoading ? "Logging Symptom..." : "Log Symptom"}
                  </Button>
                </form>

                {/* Success Message */}
                {success && (
                  <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-senior-base text-primary font-medium text-center">{success}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Symptoms */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-senior-xl flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Symptoms
                </CardTitle>
                <CardDescription className="text-senior-base">Your symptom history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSymptoms.map((symptom) => (
                  <Card key={symptom.id} className="border-border/30">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Symptom Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getSeverityEmoji(symptom.severity)}</span>
                            <div>
                              <h4 className="text-senior-lg font-semibold text-foreground">{symptom.symptom}</h4>
                              <p className="text-senior-sm text-muted-foreground">
                                {new Date(symptom.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={`text-senior-sm ${getSeverityColor(symptom.severity)}`}>
                            {symptom.severity}/10 - {getSeverityLabel(symptom.severity)}
                          </Badge>
                        </div>

                        {/* Severity Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-senior-sm text-muted-foreground">
                            <span>Severity</span>
                            <span>{symptom.severity}/10</span>
                          </div>
                          <Progress value={symptom.severity * 10} className="h-2" />
                        </div>

                        {/* Description */}
                        {symptom.description && (
                          <p className="text-senior-base text-foreground">{symptom.description}</p>
                        )}

                        {/* Triggers */}
                        {symptom.triggers && (
                          <div className="space-y-1">
                            <p className="text-senior-sm font-medium text-foreground">Triggers:</p>
                            <div className="flex flex-wrap gap-1">
                              {symptom.triggers.split(", ").map((trigger, index) => (
                                <Badge key={index} variant="outline" className="text-senior-sm">
                                  {trigger.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {recentSymptoms.length === 0 && (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-senior-lg font-semibold text-foreground mb-2">No symptoms logged yet</h4>
                    <p className="text-senior-base text-muted-foreground">
                      Start tracking your symptoms to monitor your health
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Health Insights */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-senior-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Health Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-senior-lg font-semibold text-foreground">This Week</h4>
                  <p className="text-senior-base text-muted-foreground">3 symptoms logged</p>
                  <p className="text-senior-base text-muted-foreground">Average severity: 5.7/10</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-senior-lg font-semibold text-foreground">Most Common</h4>
                  <p className="text-senior-base text-muted-foreground">Headache (2 times)</p>
                  <p className="text-senior-base text-muted-foreground">Common trigger: stress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-senior-lg font-semibold text-amber-800">Important Medical Notice</h4>
                  <p className="text-senior-base text-amber-700">
                    Always seek professional advice before diagnosing disease on your own. This symptom tracker is for
                    monitoring purposes only and should not replace professional medical consultation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
