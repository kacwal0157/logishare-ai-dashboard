# LogiShare AI - Salesforce LWC Export Guide

This document provides guidance for converting the LogiShare AI React dashboard components to Salesforce Lightning Web Components (LWC).

---

## Architecture Overview

### React → LWC Component Mapping

| React Component | LWC Component Name | Description |
|-----------------|-------------------|-------------|
| `Sidebar.tsx` | `logishareNavigation` | Main navigation sidebar |
| `Header.tsx` | `logishareHeader` | Top header with search and profile |
| `StatsGrid.tsx` | `logishareStatsGrid` | KPI stat cards |
| `DormantAssets.tsx` | `logishareDormantAssets` | Inactive trucks/drivers list |
| `ProfitabilityLens.tsx` | `logishareProfitability` | Route cost/profit analysis |
| `MatchingMap.tsx` | `logishareMatchingMap` | Nearby trucks with range filter |
| `AILiveLog.tsx` | `logishareAILog` | Real-time AI activity terminal |

---

## Key Conversion Considerations

### 1. Styling (Tailwind → SLDS)

Replace Tailwind classes with Salesforce Lightning Design System (SLDS):

```css
/* React (Tailwind) */
className="rounded-xl border border-border bg-card"

/* LWC (SLDS) */
class="slds-card slds-var-p-around_medium"
```

Custom CSS can be added in component `.css` files using CSS custom properties.

### 2. State Management

Replace React `useState` with LWC `@track` decorators:

```javascript
// React
const [rangeFilter, setRangeFilter] = useState(100);

// LWC
import { LightningElement, track } from 'lwc';
export default class LogishareMatchingMap extends LightningElement {
    @track rangeFilter = 100;
    
    handleRangeChange(event) {
        this.rangeFilter = event.target.value;
    }
}
```

### 3. Animations (Framer Motion → CSS/SLDS)

Replace Framer Motion with CSS animations:

```css
/* LWC CSS */
.fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### 4. Icons (Lucide → SLDS Icons)

Replace Lucide icons with SLDS utility icons:

```html
<!-- React -->
<Truck className="h-4 w-4" />

<!-- LWC -->
<lightning-icon icon-name="utility:truck" size="small"></lightning-icon>
```

---

## Sample LWC Component Structure

### logishareDormantAssets.js

```javascript
import { LightningElement, track } from 'lwc';

export default class LogishareDormantAssets extends LightningElement {
    @track dormantAssets = [
        {
            id: 'TRK-2847',
            type: 'truck',
            trailerType: 'Refrigerated',
            name: 'Volvo FH16 750',
            location: 'Warsaw, Poland',
            idleSince: 'Dec 23, 14:30',
            idleHours: 28,
            hasAIMatch: true,
            potentialValue: '€1,840'
        },
        // ... more assets
    ];

    handleRescueClick(event) {
        const assetId = event.target.dataset.assetId;
        // Dispatch custom event or call Apex controller
        this.dispatchEvent(new CustomEvent('rescueasset', {
            detail: { assetId }
        }));
    }
}
```

### logishareDormantAssets.html

```html
<template>
    <lightning-card title="Dormant Assets Alert" icon-name="utility:warning">
        <div slot="actions">
            <lightning-badge label={inactiveCount}></lightning-badge>
        </div>
        
        <template for:each={dormantAssets} for:item="asset">
            <div key={asset.id} class="slds-p-around_small slds-border_bottom">
                <div class="slds-grid slds-grid_vertical-align-center">
                    <div class="slds-col">
                        <span class="slds-text-body_small slds-text-color_weak">{asset.id}</span>
                        <template if:true={asset.trailerType}>
                            <lightning-badge label={asset.trailerType} class="slds-m-left_x-small"></lightning-badge>
                        </template>
                        <p class="slds-text-heading_small">{asset.name}</p>
                        <p class="slds-text-body_small">{asset.location}</p>
                    </div>
                    <div class="slds-col_bump-left">
                        <template if:true={asset.hasAIMatch}>
                            <lightning-button 
                                label="Rescue with AI" 
                                variant="brand"
                                data-asset-id={asset.id}
                                onclick={handleRescueClick}>
                            </lightning-button>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </lightning-card>
</template>
```

---

## Data Integration

### Apex Controller Example

```java
public with sharing class LogishareController {
    
    @AuraEnabled(cacheable=true)
    public static List<DormantAssetWrapper> getDormantAssets() {
        // Query from custom objects or external API
        List<Fleet_Asset__c> assets = [
            SELECT Id, Name, Type__c, Trailer_Type__c, Location__c, 
                   Last_Activity__c, Has_AI_Match__c, Potential_Value__c
            FROM Fleet_Asset__c
            WHERE Status__c = 'Dormant'
            LIMIT 50
        ];
        
        List<DormantAssetWrapper> wrappers = new List<DormantAssetWrapper>();
        for (Fleet_Asset__c asset : assets) {
            wrappers.add(new DormantAssetWrapper(asset));
        }
        return wrappers;
    }
    
    public class DormantAssetWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String type;
        @AuraEnabled public String trailerType;
        @AuraEnabled public String name;
        @AuraEnabled public String location;
        @AuraEnabled public String idleSince;
        @AuraEnabled public Integer idleHours;
        @AuraEnabled public Boolean hasAIMatch;
        @AuraEnabled public String potentialValue;
        
        public DormantAssetWrapper(Fleet_Asset__c asset) {
            this.id = asset.Name;
            this.type = asset.Type__c;
            this.trailerType = asset.Trailer_Type__c;
            // ... map other fields
        }
    }
}
```

---

## Color Tokens Mapping

| Design System Token | SLDS Equivalent | Custom CSS Property |
|---------------------|-----------------|---------------------|
| `--primary` | `--slds-c-brand` | `--logishare-primary: #4F46E5` |
| `--success` | `--slds-c-success` | `--logishare-success: #10B981` |
| `--warning` | `--slds-c-warning` | `--logishare-warning: #F59E0B` |
| `--background` | `--slds-c-background` | `--logishare-bg: #0F172A` |
| `--foreground` | `--slds-c-text` | `--logishare-text: #F8FAFC` |

---

## Recommended LWC Directory Structure

```
force-app/main/default/lwc/
├── logishareNavigation/
│   ├── logishareNavigation.js
│   ├── logishareNavigation.html
│   ├── logishareNavigation.css
│   └── logishareNavigation.js-meta.xml
├── logishareHeader/
├── logishareStatsGrid/
├── logishareDormantAssets/
├── logishareProfitability/
├── logishareMatchingMap/
├── logishareAILog/
└── logishareDashboard/     (parent container)
```

---

## Key Features to Implement

1. **Trailer Types**: Refrigerated, Flatbed, Dry Van badges
2. **Range Filter**: Use `lightning-slider` for the matching map filter
3. **Active AI Negotiations**: Footer stat showing "12" active negotiations
4. **Real-time Updates**: Use Platform Events or Streaming API for live log

---

## Next Steps

1. Create custom objects for Fleet_Asset__c, Load__c, Negotiation__c
2. Set up Apex controllers for data fetching
3. Implement Platform Events for real-time AI log updates
4. Configure Experience Cloud or internal app pages
5. Add Agentforce integration for AI matching logic
