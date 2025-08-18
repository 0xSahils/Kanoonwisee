import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  fetchLawyerProfile,
  updateLawyerProfile,
} from "../../store/slices/lawyerSlice";
import { Loader2, Save, User } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  bar_registration_number: z
    .string()
    .min(1, "Bar registration number is required"),
  specialization: z
    .string()
    .min(1, "Specialization is required")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    ),
  court_practice: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : []
    ),
  fee_structure: z.object({
    consultation: z.number().min(0, "Consultation fee must be positive"),
    court: z.number().min(0, "Court fee must be positive"),
  }),
  years_experience: z
    .number()
    .int()
    .min(0, "Experience must be a positive integer"),
  languages: z
    .string()
    .min(1, "Languages are required")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    ),
  city: z.string().min(1, "City is required"),
  consultation_type: z.enum(["online", "offline", "both"]),
});

const LawyerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.lawyer);
  const { user } = useSelector((state) => state.auth);

  // Check if profile is complete based on required fields
  const isProfileComplete = profile && 
    profile.full_name &&
    profile.bar_registration_number &&
    profile.specialization && 
    Array.isArray(profile.specialization) && 
    profile.specialization.length > 0 &&
    profile.years_experience !== undefined &&
    profile.years_experience !== null &&
    profile.languages && 
    Array.isArray(profile.languages) && 
    profile.languages.length > 0 &&
    profile.city &&
    profile.consultation_type &&
    profile.fee_structure &&
    profile.fee_structure.consultation > 0 &&
    profile.fee_structure.court > 0;

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      bar_registration_number: "",
      specialization: "",
      court_practice: "",
      fee_structure: {
        consultation: 0,
        court: 0,
      },
      years_experience: 0,
      languages: "",
      city: "",
      consultation_type: "both",
    },
  });

  useEffect(() => {
    dispatch(fetchLawyerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        bar_registration_number: profile.bar_registration_number || "",
        specialization: Array.isArray(profile.specialization)
          ? profile.specialization.join(", ")
          : "",
        court_practice: Array.isArray(profile.court_practice)
          ? profile.court_practice.join(", ")
          : "",
        fee_structure: profile.fee_structure || { consultation: 0, court: 0 },
        years_experience: profile.years_experience || 0,
        languages: Array.isArray(profile.languages)
          ? profile.languages.join(", ")
          : "",
        city: profile.city || "",
        consultation_type: profile.consultation_type || "both",
      });
    }
  }, [profile, form]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateLawyerProfile(data)).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Profile Management
          </h1>
          <p className="text-muted-foreground">
            Manage your professional information and settings
          </p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Your professional details visible to clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                  {...form.register("full_name")}
                />
                {form.formState.errors.full_name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bar_registration_number">
                  Bar Registration Number *
                </Label>
                <Input
                  id="bar_registration_number"
                  placeholder="Enter your bar registration number"
                  disabled={!isEditing}
                  {...form.register("bar_registration_number")}
                />
                {form.formState.errors.bar_registration_number && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.bar_registration_number.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Family Law, Corporate Law (separate with commas)"
                  disabled={!isEditing}
                  {...form.register("specialization")}
                />
                {form.formState.errors.specialization && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.specialization.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">Experience (Years) *</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  disabled={!isEditing}
                  {...form.register("years_experience", {
                    valueAsNumber: true,
                  })}
                />
                {form.formState.errors.years_experience && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.years_experience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation_fee">
                  Consultation Fees (₹) *
                </Label>
                <Input
                  id="consultation_fee"
                  type="number"
                  min="1"
                  disabled={!isEditing}
                  {...form.register("fee_structure.consultation", {
                    valueAsNumber: true,
                  })}
                />
                {form.formState.errors.fee_structure?.consultation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fee_structure.consultation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="court_fee">Court Fees (₹) *</Label>
                <Input
                  id="court_fee"
                  type="number"
                  min="1"
                  disabled={!isEditing}
                  {...form.register("fee_structure.court", {
                    valueAsNumber: true,
                  })}
                />
                {form.formState.errors.fee_structure?.court && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fee_structure.court.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages *</Label>
                <Input
                  id="languages"
                  placeholder="English, Hindi, Marathi (separate with commas)"
                  disabled={!isEditing}
                  {...form.register("languages")}
                />
                {form.formState.errors.languages && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.languages.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Mumbai, Maharashtra"
                  disabled={!isEditing}
                  {...form.register("city")}
                />
                {form.formState.errors.city && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation_type">Consultation Type *</Label>
                <select
                  id="consultation_type"
                  disabled={!isEditing}
                  {...form.register("consultation_type")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="online">Online Only</option>
                  <option value="offline">Offline Only</option>
                  <option value="both">Both Online & Offline</option>
                </select>
                {form.formState.errors.consultation_type && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.consultation_type.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="court_practice">
                  Court Practice (Optional)
                </Label>
                <Input
                  id="court_practice"
                  placeholder="Supreme Court, High Court (separate with commas)"
                  disabled={!isEditing}
                  {...form.register("court_practice")}
                />
                {form.formState.errors.court_practice && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.court_practice.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <Input value="Lawyer" disabled />
            </div>

            <div className="space-y-2">
              <Label>Member Since</Label>
              <Input
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"
                }
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Status</Label>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isProfileComplete ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <span className="text-sm">
                  {isProfileComplete ? "Complete" : "Incomplete"}
                </span>
              </div>
            </div>

            {!isProfileComplete && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  Complete your profile to start receiving client bookings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawyerProfile;
