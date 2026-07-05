"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Button,
  FieldError,
  FieldHint,
  Input,
  Label,
  SectionCard,
  Select,
  Textarea,
  Toggle,
} from "./ui";
import { TagInput } from "./TagInput";
import { ImageUploadField } from "./ImageUploadField";
import { PRODUCT_CATEGORIES } from "./types";

/* ---------------------------------------------------------------------------
   Schema — conditional requireds mirror models/Product.ts:
   formulations need agronomy fields; technicals need a category (AI class);
   solvents carry neither. Prices are kept as raw strings in the form and
   converted to numbers/null on submit.
--------------------------------------------------------------------------- */
const productSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required"),
    productType: z.enum(["formulation", "technical", "solvent"]),
    category: z.string(),
    image: z.string().trim().min(1, "Product image is required"),
    description: z.string().trim().min(1, "Description is required"),
    aboutProduct: z.string(),
    activeIngredient: z.string(),
    targetPestsLabelType: z.enum(["target_pests", "mode_of_action"]),
    targetPests: z.array(z.string()),
    applicableCrops: z.array(z.string()),
    dosage: z.string(),
    applicationMethod: z.string(),
    packSizes: z.array(z.string()),
    keyFeatures: z.array(z.string()),
    benefits: z.array(z.string()),
    safetyInformation: z.array(z.string()),
    safetyNote: z.string(),
    casNumber: z.string(),
    purity: z.string(),
    appearance: z.string(),
    molecularFormula: z.string(),
    hsnCode: z.string(),
    moq: z.string(),
    packing: z.array(z.string()),
    applications: z.array(z.string()),
    priceMin: z.string(),
    priceMax: z.string(),
    currency: z.string().trim().min(1, "Currency is required"),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
  })
  .superRefine((v, ctx) => {
    const require = (field: keyof typeof v, message: string) => {
      if (!String(v[field]).trim()) {
        ctx.addIssue({ code: "custom", path: [field], message });
      }
    };

    if (v.productType !== "solvent") require("category", "Category is required");
    if (v.productType === "formulation") {
      require("activeIngredient", "Active ingredient is required");
      require("dosage", "Dosage is required");
      require("applicationMethod", "Application method is required");
      require("aboutProduct", "About this product is required");
    }

    const min = v.priceMin.trim() === "" ? null : Number(v.priceMin);
    const max = v.priceMax.trim() === "" ? null : Number(v.priceMax);
    if (min !== null && (Number.isNaN(min) || min < 0)) {
      ctx.addIssue({ code: "custom", path: ["priceMin"], message: "Enter a valid price" });
    }
    if (max !== null && (Number.isNaN(max) || max < 0)) {
      ctx.addIssue({ code: "custom", path: ["priceMax"], message: "Enter a valid price" });
    }
    if (min !== null && max !== null && max < min) {
      ctx.addIssue({
        code: "custom",
        path: ["priceMax"],
        message: "Max price must be greater than min",
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;

const DEFAULT_SAFETY_NOTE =
  "Always read the product label carefully before use. Follow all safety precautions and local regulations.";

export const emptyProductForm: ProductFormValues = {
  name: "",
  productType: "formulation",
  category: "Insecticides",
  image: "",
  description: "",
  aboutProduct: "",
  activeIngredient: "",
  targetPestsLabelType: "target_pests",
  targetPests: [],
  applicableCrops: [],
  dosage: "",
  applicationMethod: "",
  packSizes: [],
  keyFeatures: [],
  benefits: [],
  safetyInformation: [],
  safetyNote: DEFAULT_SAFETY_NOTE,
  casNumber: "",
  purity: "",
  appearance: "",
  molecularFormula: "",
  hsnCode: "",
  moq: "",
  packing: [],
  applications: [],
  priceMin: "",
  priceMax: "",
  currency: "INR",
  isActive: true,
  isFeatured: false,
};

export function ProductForm({
  productId,
  slug,
  initialValues,
}: {
  /** Set when editing an existing product. */
  productId?: string;
  /** Existing slug, shown read-only on edit (changing it would break URLs). */
  slug?: string;
  initialValues?: ProductFormValues;
}) {
  const router = useRouter();
  const isEditing = Boolean(productId);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues ?? emptyProductForm,
  });

  const productType = watch("productType");
  const labelType = watch("targetPestsLabelType");

  const onSubmit = handleSubmit(async (values) => {
    // Same payload semantics as the previous admin form: solvents omit the
    // pesticide-class category so the schema enum validator accepts them.
    const payload: Record<string, unknown> = {
      ...values,
      priceMin: values.priceMin.trim() === "" ? null : Number(values.priceMin),
      priceMax: values.priceMax.trim() === "" ? null : Number(values.priceMax),
    };
    if (values.productType === "solvent") {
      delete payload.category;
    }

    try {
      const res = await fetch(
        isEditing ? `/api/products/${productId}` : "/api/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(isEditing ? "Product updated" : "Product created");
        router.push("/admin/dashboard/products");
        router.refresh();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to save product");
    }
  });

  const typeHint = useMemo(() => {
    switch (productType) {
      case "formulation":
        return "Finished product — agronomy fields (dosage, crops, pests) apply.";
      case "technical":
        return "Raw active ingredient — B2B spec fields (CAS, purity, HSN) apply.";
      case "solvent":
        return "Bulk chemical — B2B spec fields apply, no pesticide category.";
    }
  }, [productType]);

  return (
    <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-3">
      {/* Main column */}
      <div className="space-y-5 lg:col-span-2">
        <SectionCard title="Basics" description="Name, type and how the product is described.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pf-name">Product name *</Label>
              <Input id="pf-name" {...register("name")} placeholder="e.g. SensoStar 505 EC" />
              <FieldError>{errors.name?.message}</FieldError>
            </div>

            <div>
              <Label htmlFor="pf-type">Product type *</Label>
              <Select id="pf-type" {...register("productType")}>
                <option value="formulation">Formulation (finished product)</option>
                <option value="technical">Technical (raw active ingredient)</option>
                <option value="solvent">Solvent (bulk chemical)</option>
              </Select>
              <FieldHint>{typeHint}</FieldHint>
            </div>

            {productType !== "solvent" && (
              <div>
                <Label htmlFor="pf-category">Category *</Label>
                <Select id="pf-category" {...register("category")}>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                <FieldError>{errors.category?.message}</FieldError>
              </div>
            )}

            {productType === "formulation" && (
              <div>
                <Label htmlFor="pf-ai">Active ingredient *</Label>
                <Input
                  id="pf-ai"
                  {...register("activeIngredient")}
                  placeholder="e.g. Chlorpyrifos 50% + Cypermethrin 5%"
                />
                <FieldError>{errors.activeIngredient?.message}</FieldError>
              </div>
            )}

            {isEditing && slug && (
              <div className="sm:col-span-2">
                <Label htmlFor="pf-slug">Slug</Label>
                <Input id="pf-slug" value={slug} disabled />
                <FieldHint>
                  Set from the name at creation and locked — changing it would break the live URL.
                </FieldHint>
              </div>
            )}

            <div className="sm:col-span-2">
              <Label htmlFor="pf-description">Short description *</Label>
              <Textarea id="pf-description" rows={5} {...register("description")} />
              <FieldError>{errors.description?.message}</FieldError>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="pf-about">
                About this product {productType === "formulation" && "*"}
              </Label>
              <Textarea id="pf-about" rows={6} {...register("aboutProduct")} />
              <FieldError>{errors.aboutProduct?.message}</FieldError>
            </div>
          </div>
        </SectionCard>

        {productType === "formulation" && (
          <SectionCard
            title="Agronomy details"
            description="Usage guidance shown on the product page."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pf-labeltype">Section type</Label>
                <Select id="pf-labeltype" {...register("targetPestsLabelType")}>
                  <option value="target_pests">Target Pests</option>
                  <option value="mode_of_action">Mode of Action</option>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>
                  {labelType === "mode_of_action" ? "Mode of action" : "Target pests"}
                </Label>
                <Controller
                  control={control}
                  name="targetPests"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={
                        labelType === "mode_of_action" ? "Add mode of action" : "Add pest"
                      }
                    />
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Applicable crops</Label>
                <Controller
                  control={control}
                  name="applicableCrops"
                  render={({ field }) => (
                    <TagInput value={field.value} onChange={field.onChange} placeholder="Add crop" />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="pf-dosage">Dosage *</Label>
                <Input id="pf-dosage" {...register("dosage")} placeholder="e.g. 2ml per litre" />
                <FieldError>{errors.dosage?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="pf-appmethod">Application method *</Label>
                <Input
                  id="pf-appmethod"
                  {...register("applicationMethod")}
                  placeholder="e.g. Foliar spray"
                />
                <FieldError>{errors.applicationMethod?.message}</FieldError>
              </div>
              <div className="sm:col-span-2">
                <Label>Pack sizes</Label>
                <Controller
                  control={control}
                  name="packSizes"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. 100ml, 250ml, 1L"
                    />
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Key features</Label>
                <Controller
                  control={control}
                  name="keyFeatures"
                  render={({ field }) => (
                    <TagInput value={field.value} onChange={field.onChange} placeholder="Add feature" />
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Benefits</Label>
                <Controller
                  control={control}
                  name="benefits"
                  render={({ field }) => (
                    <TagInput value={field.value} onChange={field.onChange} placeholder="Add benefit" />
                  )}
                />
              </div>
            </div>
          </SectionCard>
        )}

        {productType !== "formulation" && (
          <SectionCard
            title="B2B specifications"
            description="Spec-sheet fields for export and bulk buyers."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pf-cas">CAS number</Label>
                <Input id="pf-cas" {...register("casNumber")} placeholder="e.g. 138261-41-3" />
              </div>
              <div>
                <Label htmlFor="pf-purity">Purity / assay</Label>
                <Input id="pf-purity" {...register("purity")} placeholder="e.g. min 95% w/w" />
              </div>
              <div>
                <Label htmlFor="pf-appearance">Appearance</Label>
                <Input
                  id="pf-appearance"
                  {...register("appearance")}
                  placeholder="e.g. White to off-white powder"
                />
              </div>
              <div>
                <Label htmlFor="pf-formula">Molecular formula</Label>
                <Input
                  id="pf-formula"
                  {...register("molecularFormula")}
                  placeholder="e.g. C9H10ClN5O2S"
                />
              </div>
              <div>
                <Label htmlFor="pf-hsn">HSN code</Label>
                <Input id="pf-hsn" {...register("hsnCode")} placeholder="e.g. 38089199" />
              </div>
              <div>
                <Label htmlFor="pf-moq">Minimum order qty (MOQ)</Label>
                <Input id="pf-moq" {...register("moq")} placeholder="e.g. 25 kg" />
              </div>
              <div className="sm:col-span-2">
                <Label>Packing options</Label>
                <Controller
                  control={control}
                  name="packing"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. 25 kg HDPE drum, 200 L drum, IBC"
                    />
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Applications / end-uses</Label>
                <Controller
                  control={control}
                  name="applications"
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. EC formulations, industrial cleaning"
                    />
                  )}
                />
              </div>
            </div>
          </SectionCard>
        )}

        <SectionCard title="Safety" description="Safety points and the label disclaimer.">
          <div className="space-y-4">
            <div>
              <Label>Safety information</Label>
              <Controller
                control={control}
                name="safetyInformation"
                render={({ field }) => (
                  <TagInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Add safety point"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="pf-safetynote">Safety note</Label>
              <Textarea id="pf-safetynote" rows={3} {...register("safetyNote")} />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Side rail */}
      <div className="space-y-5">
        <SectionCard title="Media" description="Shown on cards and the product page.">
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <ImageUploadField value={field.value} onChange={field.onChange} />
            )}
          />
          <FieldError>{errors.image?.message}</FieldError>
        </SectionCard>

        <SectionCard
          title="Pricing"
          description="Leave blank for “Price on request”. A price emits product-snippet structured data."
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pf-pricemin">From (min)</Label>
              <Input
                id="pf-pricemin"
                type="number"
                min={0}
                {...register("priceMin")}
                placeholder="1200"
              />
              <FieldError>{errors.priceMin?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="pf-pricemax">To (max)</Label>
              <Input
                id="pf-pricemax"
                type="number"
                min={0}
                {...register("priceMax")}
                placeholder="1800"
              />
              <FieldError>{errors.priceMax?.message}</FieldError>
            </div>
            <div className="col-span-2">
              <Label htmlFor="pf-currency">Currency</Label>
              <Input id="pf-currency" {...register("currency")} placeholder="INR" />
              <FieldError>{errors.currency?.message}</FieldError>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Visibility">
          <div className="space-y-3">
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Toggle
                  id="pf-active"
                  checked={field.value}
                  onChange={field.onChange}
                  label="Active"
                  hint="Visible in the public catalog"
                />
              )}
            />
            <Controller
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <Toggle
                  id="pf-featured"
                  checked={field.value}
                  onChange={field.onChange}
                  label="Featured"
                  hint="Highlighted on the homepage"
                />
              )}
            />
          </div>
        </SectionCard>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Saving…" : isEditing ? "Update product" : "Create product"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/dashboard/products")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
